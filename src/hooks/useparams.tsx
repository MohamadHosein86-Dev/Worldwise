import { useSearchParams } from "react-router-dom";

export default function useparams1() {
    const [serchParams ,    ] =useSearchParams();
    const map_lat = serchParams.get("lat");
    const map_lng = serchParams.get("lng"); 
      return [map_lat , map_lng] 
}
