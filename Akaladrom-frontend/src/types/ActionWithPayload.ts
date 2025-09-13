/**
 * **DESCRIPTION:**
 * 
 * With this type we can have the reference of what is an
 * action with the payload of the type T we pass.
 * 
 * **EXAMPLE OF USE:**
 * 
 * @example 
 * ActionWithPayload<string>
 * 
 */
export type ActionWithPayload<T> = {
  /**
   * On this property we know the name of the action called.
   */
  type: string;
  /**
   * On this property wee can have the value that we want to
   * pass to the action for the call.
   */
  payload: T;
};
