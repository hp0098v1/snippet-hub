"use client";

import { useState, useCallback } from "react";

import { getSession } from "@/lib/session";

type Status = "idle" | "pending" | "success" | "error";

interface State<TData> {
  status: Status;
  data: TData | null;
  error: string | null;
}

interface Options<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  isProtected?: boolean;
}

export function useAction<TInput, TData>(
  action: (data: TInput) => Promise<TData>,
  options: Options<TData> = {}
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

        // Check authentication if action is protected
        if (options.isProtected) {
          const { isAuth } = await getSession();

          if (!isAuth) {
            throw new Error("لطفا وارد حساب کاربری خود شوید");
          }
        }

        const result = await action(data);

        setState((prev) => ({
          ...prev,
          status: "success",
          data: result,
          error: null,
        }));

        options.onSuccess?.(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "خطایی رخ داد";

        setState((prev) => ({
          ...prev,
          status: "error",
          error: message,
        }));

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
