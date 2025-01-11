import { Html, Head, Body, Heading, Text } from "@react-email/components";

type Props = {
  name: string;
  code: string;
};

export function VerificationEmail({ name, code }: Props) {
  return (
    <Html dir="rtl" lang="fa">
      <Head>
        <title>تایید ایمیل اسنیپت هاب</title>
      </Head>
      <Body>
        <Heading as="h1">سلام {name}</Heading>
        <Text>برای تایید ایمیل خود کد زیر را وارد کنید.</Text>
        <Text>{code}</Text>
        <Text style={{ fontSize: "12px", color: "#666" }}>
          اگر شما درخواست تایید ایمیل نداده‌اید، این ایمیل را نادیده بگیرید.
        </Text>
      </Body>
    </Html>
  );
}
