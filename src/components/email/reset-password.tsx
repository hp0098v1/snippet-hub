import {
  Html,
  Button,
  Head,
  Body,
  Heading,
  Text,
} from "@react-email/components";

type Props = {
  name: string;
  resetLink: string;
};

export function ResetPasswordEmail({ name, resetLink }: Props) {
  return (
    <Html dir="rtl" lang="fa">
      <Head>
        <title>بازنشانی رمز عبور اسنیپت هاب</title>
      </Head>
      <Body>
        <Heading as="h1">سلام {name}</Heading>
        <Text>برای بازنشانی رمز عبور خود روی دکمه زیر کلیک کنید.</Text>
        <Button href={resetLink} style={{ color: "#61dafb" }}>
          بازنشانی رمز عبور
        </Button>
        <Text style={{ fontSize: "12px", color: "#666" }}>
          اگر شما درخواست بازنشانی رمز عبور نداده‌اید، این ایمیل را نادیده
          بگیرید.
        </Text>
        <Text style={{ fontSize: "12px", color: "#666" }}>
          این لینک تا ۱ ساعت معتبر است.
        </Text>
      </Body>
    </Html>
  );
}
