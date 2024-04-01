import { Message } from "./message.interface";

export const MockedGroups = [
  {
    _id: 1,
    name: "Running club",
    description: "A club to burn calories",
    icon_url:
      "https://as2.ftcdn.net/v2/jpg/05/78/72/67/1000_F_578726709_AtgfsV2daQE7DxZx4K6Sa5h0VCsWiKIa.jpg",
  },
  {
    _id: 2,
    name: "Study club",
    description: "A club to burn the brain",
    icon_url: "https://cdn-icons-png.flaticon.com/512/2466/2466734.png",
  },
  {
    _id: 3,
    name: "Taco Tuesday club",
    description: "A club to burn the sadness",
    icon_url: "https://cdn-icons-png.flaticon.com/512/4062/4062916.png",
  },
];

export const MockedMessages: Message[] = [
  {
    _id: 1,
    _createTime: 1711998264,
    content: "Hola",
    group_id: 1,
    user: "Paco",
    file: undefined,
  },
  {
    _id: 2,
    _createTime: 1711998264,
    content: "Que tal",
    group_id: 1,
    user: "Paco",
    file: undefined,
  },
  {
    _id: 3,
    _createTime: 1711999224,
    content: "👍",
    group_id: 1,
    user: "수민",
    file: undefined,
  },
];
