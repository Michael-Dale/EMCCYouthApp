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
"use client";
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
        <MapPin color="#dc2626" className="h-8 w-8 text-primary " />
        <h2 className="text-2xl font-bold text-center">EMCC YOUTH</h2>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm font-medium text-muted-foreground">TIME:</p>
        <p className="text-lg font-semibold">FRI 6:30PM-9PM</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="rounded-full text-lg px-8 py-6 font-bold hover:bg-red-500 hover:text-black" 
         onClick={() => window.open("https://www.google.com/maps/place/Elohim+Meyersdal+Community+Church./@-26.2987321,28.0942523,993m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1e9505391ca5cc5b:0xbe6614f1e9bb630!8m2!3d-26.2987321!4d28.0968326!16s%2Fg%2F11bt_gs4bw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D", "_blank")}
        >
          Directions
        </Button>
      </CardFooter>
    </Card>
  );
}
