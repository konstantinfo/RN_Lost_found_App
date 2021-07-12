import {
  GET_CHAT_MESSAGES,
  GET_OWNER_CHANNELS,
  GET_ANONYMOUS_CHANNELS,
  ADD_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE,
  NOTIFY_CHAT_MESSAGE,
} from "../actions/types";

const initialState = {
  chatGroup: [],
  loading: true,
  data: [],
  error: null,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case `${GET_OWNER_CHANNELS}_PENDING`:
    case `${GET_ANONYMOUS_CHANNELS}_PENDING`:
    case `${GET_CHAT_MESSAGES}_PENDING`: {
      return {
        ...state,
        loading: true,
      };
    }

    case `${GET_OWNER_CHANNELS}_REJECTED`:
    case `${GET_ANONYMOUS_CHANNELS}_REJECTED`: {
      return {
        ...state,
        loading: false,
        chatGroup: [],
      };
    }

    case `${GET_ANONYMOUS_CHANNELS}_FULFILLED`: {
      const { data } = action.payload;

      if (data.status !== 200 && data["message"]) {
        Alert.alert(data["message"]);
        return {
          ...state,
          loading: false,
          error: data["message"],
        };
      }

      if (data.status === 200) {
        return {
          ...state,
          loading: false,
          chatGroup: data.data,
        };
      }
    }

    case `${GET_OWNER_CHANNELS}_FULFILLED`: {
      const { data } = action.payload;

      console.log("data", data);

      if (data.status !== 200 && data["message"]) {
        Alert.alert(data["message"]);
        return {
          ...state,
          loading: false,
          error: data["message"],
        };
      }

      if (data.status === 200) {
        return {
          ...state,
          loading: false,
          chatGroup: data.data,
        };
      }
    }

    case GET_CHAT_MESSAGES: {
      return {
        ...state,
        loading: false,
        data: action.payload.reverse(),
      };
    }

    case SEND_CHAT_MESSAGE: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}
