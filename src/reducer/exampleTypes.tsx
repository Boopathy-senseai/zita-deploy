export interface Example {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ExampleState {
  isLoading: boolean;
  error: string;
  data: Example;
}
