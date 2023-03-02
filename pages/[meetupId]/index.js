import MeetupDetail from "@/components/meetups/MeetupDetail";

import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title}</title>
        <meta
          name="description"
          content={props.meetup.description}
        ></meta>
      </Head>
    <MeetupDetail
      image={props.meetup.image}
      title={props.meetup.title}
      address={props.meetup.address}
      description={props.meetup.description}
    />
    </Fragment>
  );
}

export default MeetupDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/NextJS_Meetup_App"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: meetupIds.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/NextJS_Meetup_App"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
