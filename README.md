# Example of External Policy Server

This is an example of a policy server. In this case we have built it with 
ExpressJS, but we can achieve the same using other framework as for example Flask.

Find more information about how to write policies in our doc: https://docs.pexip.com/admin/integrate_policy.htm

## Pre-requisites

In order to use the external policy we will need the following:

- Infinity deployment with access to the management node.
- `node` and `npm` installed in our personal computer

## How to test the policy

In this section we will explain how to launch the external policy and configure
it in our management node.

### Launch the ExpressJs app

As a first step we will need to install all dependencies:

    $ npm install

Once we have installed all the dependencies, we can launch the policy with the
following command:

    $ npm start

Now we have the policy running in `http://localhost:3000`, but it isn't accessible
by Infinity.

### Expose the service to the world

Now we will expose our local service to the world. For this task we will use a tool
called `localtunnel`. The first step is to install this tool globally:

    $ npm install -g localtunnel

Now we need to open another terminal and launch the tool indicating our local port:

    $ lt --port 3000 -h http://localtunnel.me

This will give us a url similar to the following: https://lemon-rats-ask-5-224-67-236.loca.lt


### Create the External Policy in the Management Node

Now it's time to configure the policy in the management node:

- Open the management node URL.
- Go to `Call Control` > `Policy Profiles`.
- Click on the bottom-left button: `Add Policy profile`.
- Insert at least the following information:
  - Name: `<whatever-you-want>`
  - URL: The url that was returned by localtunnel, e.g. https://lemon-rats-ask-5-224-67-236.loca.lt
  - Service configuration policy: Check the box for `Enable external service configuration lookup`.
  - Click `Save`.

### Assign the Policy to a Location

The last configuration step is to assign our policy to location and this way to
the conferencing nodes assigned to that location.

- Open the management node URL.
- Go to `Platform` > `Locations`.
- Select the location in which you want to add the policy.
- Go to `Policy profile` and select the profile that you have created in the previous step.
- Wait around a minute to propagate the configuration to all the conferencing nodes.

### Join a conference

Now it's time to make the first call an test that the external policy server
is working properly. For that, go to the conferencing node and try to call to
a vmr that starts by "my-vmr-", e.g. "my-vmr-conference" and introduce the
password "2931". You will join to the conference,

## Deployment in production

In production we will have to put a reverse proxy in front of the local policy.
ExpressJS give some advice about how to do this task: https://expressjs.com/en/advanced/best-practice-performance.html