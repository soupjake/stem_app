import Auth from "@aws-amplify/auth";
import API from "@aws-amplify/api";

Auth.configure({
  mandatorySignIn: true,
  region: process.env.VUE_APP_AWS_REGION,
  userPoolId: process.env.VUE_APP_USER_POOL,
  identityPoolId: process.env.VUE_APP_IDENTITY_POOL,
  userPoolWebClientId: process.env.VUE_APP_APP_CLIENT
});

API.configure({
  endpoints: [
    {
      name: "jobs",
      endpoint: process.env.VUE_APP_GATEWAY_URL,
      region: process.env.VUE_APP_AWS_REGION
    },
    {
      name: "blogs",
      endpoint: process.env.VUE_APP_GATEWAY_URL,
      region: process.env.VUE_APP_AWS_REGION
    }
  ]
});


