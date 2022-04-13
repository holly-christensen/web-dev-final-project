import {useQuery} from "react-query";
import {GraphQLClient, gql} from "graphql-request";

// const API_URL = `https://api.takeshape.io/project/${process.env.PROJECT_ID}/v3/graphql`;
const API_URL = `https://api.podchaser.com/graphql`;
const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWZlNDNlYy01MTQ3LTRmZTEtOTlkNy1kNTI3ZGY5Zjc2YWQiLCJqdGkiOiJlNzg0NzAwMjU4ZWNmZDFlNWMzY2UyNjhkZDY5NmY4MTY5YjYyZDMyYTQ1NDc1ZTE5M2ZmMzM3ODU1NDM0YmJjZWI5Y2E1MWRhMWU1N2E0YSIsImlhdCI6MTY0OTQ1MDg4Ni41ODM5NTcsIm5iZiI6MTY0OTQ1MDg4Ni41ODM5NjEsImV4cCI6MTY4MDk4Njg4Ni41NzQwMTUsInN1YiI6IiIsInNjb3BlcyI6WyIqIl19.GqsZlxKEZ_ClOcGH8GmJQK_v_W3GMQoaKb2KlFqx2s-RNHDH-7eFcX6nvhrcs3QoHD3Ms9ZfF73m6cfIhAPHqWIWXbo56E_VOdxdHLWiCwjXHGibAUZw5ZdB261eqz0T9U7dzqUMKp4FjhMqyy4Q1WVnhIUxIWGs4yz2aIJeRJ7sLZTU2i6Zy-4ESNWLka1WXofViHR9WNM_WxIycLl4S4p1IlCK2OPK6EiSbi53wnjUqyEccIhnJbKMTaW8GkG7FqkrkZPAC0CBTe-iIwst8Z3oRHJ7sCItreMRF9pN-MVqbAokI0-Td6NyJ24An6v7xcEefOCzHcH4YxxEJVyRZ0D9vz3uDZd2WGSAAaIhUpOrtECiNUBXr1EpRajfBvZmUuDYoqsgzBCT8yl25HXLmSg5boEjMOgT5_LWHnzM-Su38MZ65JBxXbjztceV0uCaDLRIWUdAUKMHp2PpaOA41ULh5F1l7Ts2vlql1vLn5nzldA34JSrhR06hDkaNxGIeZxx6VZ2z3lPcjhHzMgHWpUi_ZmKKjB2g_NvMmbtRbtat-eyK0EVfriWMZBGFW-piKB42IEnGgjJGx_2Wm2H8NatgTZzhyqG8cYpkdsZKR25-OX7UxaEfUglE5NOBmsmyAQfdQeRe1uy8jzn7u4aJKj1o8UOW4t7rmvXii7h7Wz0`;

const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
});

export function useGetPodcasts() {
    return useQuery("get-podcasts", async () => {
        const {getPodcastList} = await graphQLClient.request(gql`
      query {
        podcasts {
            data {
                title,
                description
            }
        }
      }
    `);
        return getPodcastList;
    });
}

export function useGetPodcast(podcastId) {
    return useQuery(["get-podcast", podcastId], async () => {
        const {getPodcast} = await graphQLClient.request(
            gql`
        query getPost($postId: ID!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }
      `,
            {podcastId}
        );
        return getPodcast;
    });
}