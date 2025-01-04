import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchFormSkeleton({ btnCount = 1 }: { btnCount?: number }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="max-w-md w-full">
        <Skeleton className="h-10 w-full rounded-lg bg-card" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: btnCount }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-lg bg-card" />
        ))}
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <nav className="flex justify-center">
      <ul className="flex items-center gap-1">
        {/* Previous Button */}
        <li>
          <Skeleton className="h-9 w-9 rounded-lg" />
        </li>

        {/* Page Numbers */}
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="h-9 w-9 rounded-lg" />
          </li>
        ))}

        {/* Ellipsis */}
        <li>
          <Skeleton className="h-9 w-9 rounded-lg" />
        </li>

        {/* Last Page */}
        <li>
          <Skeleton className="h-9 w-9 rounded-lg" />
        </li>

        {/* Next Button */}
        <li>
          <Skeleton className="h-9 w-9 rounded-lg" />
        </li>
      </ul>
    </nav>
  );
}

export function SnippetListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SnippetCardSkeleton key={i} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
}

export function SnippetCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-12" />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-8" />
      </CardFooter>
    </Card>
  );
}

export function UserListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <UserCardSkeleton key={i} />
        ))}
      </div>
      <PaginationSkeleton />
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <Card className="group transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
