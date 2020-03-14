const dev = {
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-bucket-s3"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://391rs0yjua.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_JqFAI3Pch",
    APP_CLIENT_ID: "267gk6v8liqbro9vo81e60hf3e",
    IDENTITY_POOL_ID: "us-east-2:0557d64a-67ff-4658-9269-71c8972c4f44"
  }
};

const prod = {
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-bucket-s3"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://391rs0yjua.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_JqFAI3Pch",
    APP_CLIENT_ID: "267gk6v8liqbro9vo81e60hf3e",
    IDENTITY_POOL_ID: "us-east-2:0557d64a-67ff-4658-9269-71c8972c4f44"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,

  // Common config values here
  MAX_ATTACHMENT_SIZE: 5000000
};
