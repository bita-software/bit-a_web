"use client"

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function CalReact({scheduleId}: {scheduleId: string}) {

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":true,"layout":"month_view"});
    })();
  }, [])
    return <Cal namespace={scheduleId}
    calLink={`bit-a/${scheduleId}`}
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
    
    
  />;
};
  