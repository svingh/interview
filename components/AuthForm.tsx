"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { auth } from "@/Firebase/client";
import { signUp } from "@/lib/actions/auth.action";

type FormType = "sign-in" | "sign-up";

/* Build schema on the fly */
const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Min 3 characters")
        : z.string().optional().or(z.literal("")),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Min 3 characters"),
  });

/* --------------------------------------- */

export default function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isSignIn
      ? { email: "", password: "" } // no name on sign-in
      : { name: "", email: "", password: "" },
  });

  /* submit */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isSignIn) {
        console.log("Sign-in:", values);
        toast.success("Welcome back!");
        router.push("/");
      } else {
        const{name,email,password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        })

        if(!result.success){
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  /* ----------------------------------- UI */

  return (
    <div className="border-3 rounded-3xl lg:min-w-[566px]">
      <div className="flex flex-col gap-6 py-14 px-10">
        {/* Logo */}
        <div className="flex justify-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 text-xl font-bold">prepwise</h2>
        </div>

        <h3 className="text-center text-lg font-semibold">
          Practice job interviews like real interviews
        </h3>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full mt-4"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
            />

            <Button type="submit" className="w-full">
              {isSignIn ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </Form>

        {/* Footer switch */}
        <p className="text-center">
          {isSignIn ? "No account yet?" : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1 hover:underline"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
