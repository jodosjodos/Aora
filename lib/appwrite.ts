import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jodos.aora",
  projectId: "66e00bb2001fcd6712aa",
  databaseId: "66e00cd80021c57203c8",
  userCollectionId: "66e00d03001221e8d485",
  videoCollectionId: "66e00d9f002dfb60457a",
  storageId: "66e0175f0009faf41ac4",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error("failed to create new session");
    await account.deleteSessions();

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await  databases.createDocument(config.databaseId,config.userCollectionId,ID.unique(),{
        accountId:newAccount.$id,
        email,
        username,
        avatar:avatarUrl
    })
    return newUser
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await account.deleteSessions();
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
