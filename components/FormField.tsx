import {
  View,
  Text,
  TextInputProps,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}
const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-100 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            className="flex-shrink-0 ml-2"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
