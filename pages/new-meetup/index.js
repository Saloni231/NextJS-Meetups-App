import { useRouter } from "next/router";

import Head from "next/head";
import { Fragment } from "react";

const {
  default: NewMeetupForm,
} = require("@/components/meetups/NewMeetupForm");

function NewMeetupPage() {

  const router = useRouter();

  async function addMeetupHandler(enteredData) {

    const response = await fetch("/api/new-meetup",{
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking oppertunities"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />{" "}
    </Fragment>
  );
}

export default NewMeetupPage;
