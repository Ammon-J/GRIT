// 99% vibe coded by Jonas 😎🎵
import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { useAudioPlayer } from "expo-audio";

// 🎶 Add all your audio files here
const audioFiles = {
  Phon: require("@/assets/audio/Phon.mp3"),
  Rave: require("@/assets/audio/Rave.mp3"),
  West: require("@/assets/audio/west.mp3"),
  Built: require("@/assets/audio/built.mp3"),
  Retourne: require("@/assets/audio/Retourne.mp3"),
  Slap: require("@/assets/audio/Slap.mp3"),
  Ura: require("@/assets/audio/ura.mp3"),
};

type AudioPlayerModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AudioPlayerModal({ visible, onClose }: AudioPlayerModalProps) {
  const [currentTrack, setCurrentTrack] = useState<keyof typeof audioFiles>("Phon");
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useAudioPlayer(audioFiles[currentTrack]);

  /*
    useEffect(() => {
      player.play();
    }, [player]);

    */

  const toggleAudio = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const changeTrack = (track: keyof typeof audioFiles) => {
    if (isPlaying) {
      player.stop();
      setIsPlaying(false);
    }
    setCurrentTrack(track);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Current Track: {currentTrack}</Text>
          <Button
            title={isPlaying ? "Stop Audio" : "Play Audio"}
            onPress={toggleAudio}
          />

          <Text style={{ marginTop: 20, marginBottom: 10 }}>Choose Track:</Text>
          {Object.keys(audioFiles).map((track) => (
            <Button
              key={track}
              title={track}
              onPress={() => changeTrack(track as keyof typeof audioFiles)}
            />
          ))}

          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
  },
});
