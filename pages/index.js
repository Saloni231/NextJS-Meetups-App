import MeetupList from "@/components/meetups/MeetupList";

import { MongoClient } from "mongodb";

import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export default HomePage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/NextJS_Meetup_App"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 10, //this will re generate this page every 10 seconds
  };
}
