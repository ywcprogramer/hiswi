// @ts-ignore
/* eslint-disable */

declare namespace HiParams {
    type pushDataRadio = {
      Type?: string;
      hitoken?: string;
      proNumber?: number;
      radioType?:string;
    };

    type respRadio2g = {
        error_code?: number;
        radio2g?: {
            channel?:string;
            disabled?:number;
            htmode?:string;
            lbd?:number;
            minAccess?:number;
            roam?:number;
            txpower?:number;
        };
    };
  };
  }
  