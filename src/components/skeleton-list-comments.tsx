import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCommentItem() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
}

export function SkeletonCommentReply() {
  return (
    <Card className="mb-2 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2 w-14" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  );
}

export function SkeletonListComments() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <SkeletonCommentItem />
          <div className="ml-8 border-l pl-4">
            {i === 1 && (
              <>
                <SkeletonCommentReply />
                <SkeletonCommentReply />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
