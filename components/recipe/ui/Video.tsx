import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import YoutubePlayer from "react-native-youtube-iframe";

type VideoProps = {
  videoUrl: string;
};
const Video = ({ videoUrl }: VideoProps) => {
  return (
    <View className="gap-4">
      <Text
        style={{ fontSize: hp(2.5) }}
        className="font-bold flex-1 text-neutral-700"
      >
        Recipe Video
      </Text>

      <View>
        <YoutubePlayer height={hp(30)} videoId={videoUrl.split("=")[1]} />
      </View>
    </View>
  );
};

export default Video;
