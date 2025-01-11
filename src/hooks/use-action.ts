"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

import { getSession } from "@/lib/session";
import { ActionResult } from "@/types";

type Status = "idle" | "pending" | "success" | "error";

interface State<TData> {
  status: Status;
  data: TData | null;
  error: string | null;
}

interface Options<TInput, TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  onRequest?: (data: TInput) => void;
  onResponse?: (result: ActionResult<TData>) => void;
  isProtected?: boolean;
  showSuccessMessage?: boolean;
}

export function useAction<TInput, TData>(
  action: (data: TInput) => Promise<ActionResult<TData>>,
  options: Options<TInput, TData> = {}
) {
  const [state, setState] = useState<State<TData>>({
    status: "idle",
    data: null,
    error: null,
  });

  const execute = useCallback(
    async (data: TInput) => {
      try {
        setState((prev) => ({ ...prev, status: "pending", error: null }));
        options.onRequest?.(data);

        if (options.isProtected) {
          const { isAuth } = await getSession();

          if (!isAuth) {
            throw new Error("لطفا وارد حساب کاربری خود شوید");
          }
        }

        const result = await action(data);
        options.onResponse?.(result);

        if (result.type === "error") {
          setState((prev) => ({
            ...prev,
            status: "error",
            error: result.error,
          }));
          toast.error(result.error);
          options.onError?.(result.error);
          return;
        }

        setState((prev) => ({
          ...prev,
          status: "success",
          data: result.data,
          error: null,
        }));

        if (options.showSuccessMessage !== false && result.message) {
          toast.success(result.message);
        }

        options.onSuccess?.(result.data);
        return result.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "خطایی رخ داد";

        setState((prev) => ({
          ...prev,
          status: "error",
          error: message,
        }));

        toast.error(message);
        options.onError?.(message);
      }
    },
    [action, options]
  );

  const reset = useCallback(() => {
    setState({
      status: "idle",
      data: null,
      error: null,
    });
  }, []);

  return {
    execute,
    reset,
    status: state.status,
    data: state.data,
    error: state.error,
    isIdle: state.status === "idle",
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
  };
}
