// import { MapPin } from "lucide-react";

// export default function Component() {
//   return (
//     <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="flex flex-col items-center space-y-2 p-6 pb-2">
//         <MapPin className="h-8 w-8 text-blue-500" />
//         <h2 className="text-2xl font-bold text-center text-gray-800">EMCC</h2>
//       </div>
//       <div className="text-center p-6 pt-2">
//         <p className="text-sm font-medium text-gray-500">YOUTH TIME:</p>
//         <p className="text-lg font-semibold text-gray-800">FRI 7PM-9PM</p>
//       </div>
//     </div>
//   );
// }
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { MapPin } from "lucide-react";

export default function Component() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="flex flex-col items-center space-y-2 pb-2">
        <MapPin className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-center">EMCC</h2>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm font-medium text-muted-foreground">YOUTH TIME:</p>
        <p className="text-lg font-semibold">FRI 6:30PM-9PM</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="rounded-full text-lg px-4 py-4 font-bold hover:bg-red-500 hover:text-black">
          Directions
        </Button>
      </CardFooter>
    </Card>
  );
}
