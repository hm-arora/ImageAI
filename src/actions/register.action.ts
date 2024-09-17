"use server";
import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/user.model";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name, image } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email: email.toLowerCase() });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const userData = {
      name,
      email: email.toLowerCase(),
      image,
      password,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userData.password = hashedPassword;
    }

    const user = new User(userData);
    const savedUser = await user.save();
    return { success: true, user: savedUser };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred during registration." };
  }
};

export const findOrCreateUser = async (profile: any) => {
  try {
    await connectDB();
    let user = await User.findOne({ email: profile.email.toLowerCase() });

    if (!user) {
      const result = await register({
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      });
      user = result.user;
    }

    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserById = async (id: string) => {
  await connectDB();
  const user: UserDocument | null = await User.findById(id);
  return user;
};
