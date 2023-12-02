import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {connectToDB} from "@/serviceClients/mongodb";
import User from "@/models/user";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email
			});
			
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				// serverless -> lambda -> dynamodb
				await connectToDB();
				
				// check if user already exists
				const userExists = await User.findOne({
					email: profile.email
				});
				
				// if not, create a new user
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture
					});
				}
				
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
	}
});

export { handler as GET, handler as POST };
