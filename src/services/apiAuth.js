import supabase, { supabaseUrl } from "./supabase";

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signup = async ({ email, password, fullName }) => {
  // Save the current session before signing up a new user
  const { data: savedSessionData } = await supabase.auth.getSession();

  //signing up
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  //If there was a previously authenticated user, restore their session
  // This action should be placed right after signUp, otherwise the authError will stop the restore
  if (savedSessionData) {
    await supabase.auth.setSession(savedSessionData.session);
  }
  // Handle errors
  let authError = null;
  if (user && !user.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }
  if (authError) throw new Error(authError.message);
  return user;
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  const hasImagePath = avatar?.startsWith?.(supabaseUrl);

  const imageName = `${Date.now()}-${avatar?.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? avatar
    : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  const dataToUpdate = password
    ? {
        password,
      }
    : {
        data: {
          fullName,
          avatar: imagePath,
        },
      };

  const { data, error } = await supabase.auth.updateUser(dataToUpdate);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (password) return;

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (storageError) {
    console.error(storageError.message);
    throw new Error("Avatar could not be uploaded");
  }

  return data;
};
