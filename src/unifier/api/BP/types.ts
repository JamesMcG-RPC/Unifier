export interface BP {
  options: {
    project_number: string;
    bpname: string;
    LineItemIdentifier?: string;
    optimizedPickerExecution?: boolean;
    workflow_details?: {
      WFCurrentStepName: string;
      WFActionName: string;
    };
  };
  data: {
    ugenDescriptionMTL4000?: string;
    _bp_lineitems?: {
      [key: string]: string | number | boolean;
    }[];
    record_no: string;
    
  }[];
}
