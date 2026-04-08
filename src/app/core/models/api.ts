export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiEndpointSpec {
  method: HttpMethod;
  path: string;
  description: string;
  requestShape?: string;
  responseShape: string;
}

