/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId:"pux4p4jv",
  dataset: "production",
  apiVersion: '2023-01-01',
  useCdn: true,
});


