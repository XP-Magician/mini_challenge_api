const CONFIG = {
  URI: "http://localhost:54321/",
  USERNAME: "foris_challenge",
  PASSWORD: "ForisChallenge",
};

export const TEXT = {
  INSTRUCTIONS: `instructions :Connect to '/challenge' using your access_token and follow the instructions in the response. Note that the access_token expires in one hour. Include it in the Authorization header in the format 'Bearer {access_token}'. For examples, refer to: https://swagger.io/docs/specification/authentication/bearer-authentication/.`,
};

export default CONFIG;
