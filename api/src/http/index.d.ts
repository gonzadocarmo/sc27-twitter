import { Method } from "axios";

interface CallAPIType {
  url: string;
  method?: Method;
  data?: any;
  headers?: {};
}

interface ServiceResponse {}

interface Error {
  code: string;
  data: string | ServiceResponse;
}
