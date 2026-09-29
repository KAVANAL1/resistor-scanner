import argparse
import numpy as np
from tflite_runtime.interpreter import Interpreter
import cv2
import json


def preprocess_image(path):
    img = cv2.imread(path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = (img / 127.5) - 1.0     # SAME AS TRAIN/TEST SCRIPT
    return np.expand_dims(img.astype(np.float32), 0)


def run_inference(model_path, image_path):
    # Load TFLite model
    interpreter = Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # ---------------------------------------
    # Group output heads: digit / color / tol
    # ---------------------------------------
    digit_heads = []
    color_heads = []
    tol_head = None

    for i, d in enumerate(output_details):
        shape = d["shape"][1]

        if shape == 10:
            digit_heads.append(i)
        elif shape == 12:
            color_heads.append(i)
        elif shape == 7:
            tol_head = i

    digit_heads = sorted(digit_heads)
    color_heads = sorted(color_heads)

    # Three digit heads:
    band1_digit_idx      = digit_heads[0]
    band2_digit_idx      = digit_heads[1]
    multiplier_digit_idx = digit_heads[2]

    # Four color heads:
    band1_color_idx      = color_heads[0]
    band2_color_idx      = color_heads[1]
    multiplier_color_idx = color_heads[2]
    tolerance_color_idx  = color_heads[3]

    # Preprocess image
    img = preprocess_image(image_path)
    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()

    o = interpreter.get_tensor

    # DIGIT predictions
    b1  = int(np.argmax(o(output_details[band1_digit_idx]["index"])))
    b2  = int(np.argmax(o(output_details[band2_digit_idx]["index"])))
    mul = int(np.argmax(o(output_details[multiplier_digit_idx]["index"])))
    tol = int(np.argmax(o(output_details[tol_head]["index"])))

    # COLOR predictions
    c1 = int(np.argmax(o(output_details[band1_color_idx]["index"])))
    c2 = int(np.argmax(o(output_details[band2_color_idx]["index"])))
    c3 = int(np.argmax(o(output_details[multiplier_color_idx]["index"])))
    c4 = int(np.argmax(o(output_details[tolerance_color_idx]["index"])))

    digit_colors = [
        "black", "brown", "red", "orange", "yellow",
        "green", "blue", "violet", "grey", "white"
    ]

    color_names = [
        "black", "brown", "red", "orange", "yellow",
        "green", "blue", "violet", "grey", "white",
        "gold", "silver"
    ]

    tol_names = [
        "0.05%", "0.1%", "0.25%", "0.5%", "1%", "2%", "5%"
    ]

    # ==========================
    # FINAL CORRECTED MAPPING
    # ==========================
    band1_digit = b2
    band2_digit = mul
    multiplier_digit = b1

    band1_color = color_names[c1]
    band2_color = color_names[c4]
    multiplier_color = color_names[c3]
    tolerance_color = color_names[c2]

    resistance_value = (b2 * 10 + mul) * (10 ** b1)

    result = {
        "band1_digit": band1_digit,
        "band2_digit": band2_digit,
        "multiplier_digit": multiplier_digit,
        "tolerance_digit_index": tol,

        "band1_color": band1_color,
        "band2_color": band2_color,
        "multiplier_color": multiplier_color,
        "tolerance_color": tolerance_color,

        "tolerance_percentage": tol_names[tol],
        "resistance_ohms": resistance_value
    }

    print(json.dumps(result))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    parser.add_argument("--image", required=True)
    args = parser.parse_args()

    run_inference(args.model, args.image)
