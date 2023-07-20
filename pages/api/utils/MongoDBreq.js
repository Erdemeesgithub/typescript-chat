export default async function handler(action, options) {
  const result = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/data-jifhx/endpoint/data/v1/action/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "tDrANfj27M4iQ4Qc5GqFmgSDOpN9hrRQyHjfjYJZEAFLLDYO3bGmiBxzQ7hlo0xg",
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "chat",
        collection: "messages",
        ...options,
      }),
    }
  ).then((res) => res.json());

  return result;
}
