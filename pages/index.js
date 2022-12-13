import Head from "next/head";
import { Emailer } from "../components/Emailer";

export default function Home() {
  return (
    <div
      className="bg-[url('/Gif3.gif')] bg-no-repeat bg-cover 
      h-screen overflow-y-scroll overflow-hidden"
    >
      <Head>
        <title>Emailer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-2xl mx-auto">
        <Emailer />
      </div>
    </div>
  );
}
