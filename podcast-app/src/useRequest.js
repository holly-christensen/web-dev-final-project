import {useQuery} from "react-query";
import {GraphQLClient, gql} from "graphql-request";

// const API_URL = `https://api.takeshape.io/project/${process.env.PROJECT_ID}/v3/graphql`;
const API_URL = `https://api.podchaser.com/graphql`;
// const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWZlNDNlYy01MTQ3LTRmZTEtOTlkNy1kNTI3ZGY5Zjc2YWQiLCJqdGkiOiJlNzg0NzAwMjU4ZWNmZDFlNWMzY2UyNjhkZDY5NmY4MTY5YjYyZDMyYTQ1NDc1ZTE5M2ZmMzM3ODU1NDM0YmJjZWI5Y2E1MWRhMWU1N2E0YSIsImlhdCI6MTY0OTQ1MDg4Ni41ODM5NTcsIm5iZiI6MTY0OTQ1MDg4Ni41ODM5NjEsImV4cCI6MTY4MDk4Njg4Ni41NzQwMTUsInN1YiI6IiIsInNjb3BlcyI6WyIqIl19.GqsZlxKEZ_ClOcGH8GmJQK_v_W3GMQoaKb2KlFqx2s-RNHDH-7eFcX6nvhrcs3QoHD3Ms9ZfF73m6cfIhAPHqWIWXbo56E_VOdxdHLWiCwjXHGibAUZw5ZdB261eqz0T9U7dzqUMKp4FjhMqyy4Q1WVnhIUxIWGs4yz2aIJeRJ7sLZTU2i6Zy-4ESNWLka1WXofViHR9WNM_WxIycLl4S4p1IlCK2OPK6EiSbi53wnjUqyEccIhnJbKMTaW8GkG7FqkrkZPAC0CBTe-iIwst8Z3oRHJ7sCItreMRF9pN-MVqbAokI0-Td6NyJ24An6v7xcEefOCzHcH4YxxEJVyRZ0D9vz3uDZd2WGSAAaIhUpOrtECiNUBXr1EpRajfBvZmUuDYoqsgzBCT8yl25HXLmSg5boEjMOgT5_LWHnzM-Su38MZ65JBxXbjztceV0uCaDLRIWUdAUKMHp2PpaOA41ULh5F1l7Ts2vlql1vLn5nzldA34JSrhR06hDkaNxGIeZxx6VZ2z3lPcjhHzMgHWpUi_ZmKKjB2g_NvMmbtRbtat-eyK0EVfriWMZBGFW-piKB42IEnGgjJGx_2Wm2H8NatgTZzhyqG8cYpkdsZKR25-OX7UxaEfUglE5NOBmsmyAQfdQeRe1uy8jzn7u4aJKj1o8UOW4t7rmvXii7h7Wz0`;
const BEARER_TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjJkZWM3Yi0yZDVhLTRiZDgtOTQ3MC1iZDdlZjRmYWExMjEiLCJqdGkiOiJhNzliMDdiZmUwYTRkMjgzYzUzMGVjYmMyY2JmZDg5OThiMDllYWU2NjlmOTBlYWM4M2M5YTg3YTY4NDhhZTAwZTJlYjViYzM4Y2RiZjgxOCIsImlhdCI6MTY1MTI0MDEyMS41MzkxNCwibmJmIjoxNjUxMjQwMTIxLjUzOTE0OCwiZXhwIjoxNjgyNzc2MTIxLjUxMDUxOSwic3ViIjoiIiwic2NvcGVzIjpbIioiXX0.Ef-wBWW0WXIEwFX318RzKXXxOy_Yv-Mq5tC6e3kf-20kBumQlChlO65RTGD_HF3YNcgUA761L8UiqlFxqsGvAEvUugZWR1lo9VXF8kSqyjQcxf0WCel5RES5XEaHECnT6_mMGcXlDRgRTuknq2KRyR1DPtz1DIAhdxmPrqm1Tirx00aIZfDpa0_K6nb66BQG_M8AD3UM4Txhwfg2OL7NPkL-wmMtTU9HPpQwPboMhIj2tDtGDyjsh75KBRLGPD5XO8BPAG2sR3mageCMHd4NWHAq4C2eMWtwtgXd__PJQKKkZGpCmUsIVdYX4z7IKTL5x-5UGKMsLNT0IgG04cQjvM6sYMtkfocrD9U5jDSQv7D1Tt5jP1734uKGb7DdGEgwrbe2KWKt4ncBn0k9-nygBYYtdyW5tz7Zv7pUvwP7QOBPmCkUGiy4tchLpiB2_H8tx3bbTP8oCkortz0Tur3dLni4W92KgxJjCZ-SYmRUk9vZWMPLvhMlioGdz9cngHRguwvbKiqYihums6kX5HrjeGD8nmaYNS0Py5wH8_qPvnWWiCddBjH94Tvfqp2-P7vh4gvZzu_Tc_3c9zkkA1bgqWi2suT28_kUzFS87k72SOaKtxCl9G6zpijOh7z9KcdZqCjTA3Wq4qMGKj8ALOaV4Fvrc_7JESkGlbnwtGbDAmg`
const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
});

export async function useGetPodcasts() {
    return await graphQLClient.request(gql`
      query {
        podcasts {
            data {
                id,
                title,
                description
            }
        }
      }
    `);
}

export async function useGetPodcast(podcastId) {
    return await graphQLClient.request(
        gql`
        query getPost($postId: ID!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }
      `, {podcastId}
    );

}

export async function getPodcastsBySearchTerm(searchTerm) {
    return await graphQLClient.request(gql`
        query {
            podcasts(searchTerm: "${searchTerm}") {
                data {
                    id,
                    title,
                    imageUrl,
                    description
                }
            }
        }
    `);
}

export async function getPodcastsById(id) {
    return await graphQLClient.request(gql`
        query {
            podcast(identifier: {type: PODCHASER, id: "${id}"}) {
                id,
                title,
                imageUrl,
                description
            }
        }
    `);
}

export async function getEpisodesById(id) {
    return await graphQLClient.request(gql`
        query {
            episode(identifier: {type: PODCHASER, id: "${id}"}) {
                id,
                title,
                imageUrl,
                description
            }
        }
    `);
}

export async function getPodcastEpisodes(id, page) {
    return await graphQLClient.request(gql`
        query {
            podcast(identifier: {type: PODCHASER, id: "${id}"}) {
                episodes(page: ${page}, first: 5, sort: {sortBy: AIR_DATE, direction: DESCENDING}) {
                    paginatorInfo {
                        currentPage,
                        hasMorePages,
                        lastPage,
                    },
                    data {
                        id,
                        title,
                        airDate,
                        imageUrl,
                    }
                }
            }
        }
    `);
}