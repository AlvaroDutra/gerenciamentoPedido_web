import { useRouteError } from "react-router-dom";
import { TriangleAlert } from 'lucide-react'

export default function ErrorPage() {
  const error = useRouteError() as {statusText: string, message:string};
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen space-y-6">
        <TriangleAlert className="text-red-700 size-28"/>
        <h1 className="font-semibold text-7xl text-neutral-950">Oops!</h1>
        <p className="font-semibold text-neutral-950">Sorry, an unexpected error has occurred.</p>
        <p>
            <i className="text-neutral-950 font-semibold">{error.statusText || error.message}</i>
        </p>

    </div>
  );
}
