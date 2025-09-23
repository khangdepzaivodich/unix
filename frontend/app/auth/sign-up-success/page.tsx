import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GiConfirmed } from "react-icons/gi";

export default function Page() {
  return (
    <div className=" flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-violet-500 to-violet-800">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <GiConfirmed className="text-green-500" size={50} />
              <CardTitle className="text-2xl">
                Cảm ơn bạn đã đăng ký!
                {/* Thank you for signing up! */}
              </CardTitle>
              <CardDescription>
                Kiểm tra email để xác nhận
                {/* Check your email to confirm */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bạn đã đang ký thành công. Hãy kiểm tra email trước khi đăng
                nhập
                {/* You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in. */}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
