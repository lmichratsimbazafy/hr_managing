export class AuthServices {
  static setAccessToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  static getAccessToken = async (): Promise<string | null> =>
    localStorage.getItem("token");

  static removeAccessToken = (): void => localStorage.removeItem("token");

  static isAuthenticated = (): boolean => !!localStorage.getItem("token");
}
