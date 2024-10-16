
import os
import xml.etree.ElementTree as ET

# Function to remove namespace prefixes but preserve xmlns attribute
def remove_namespace(element):
    for elem in element.iter():
        if '}' in elem.tag:
            elem.tag = elem.tag.split('}', 1)[1]  # Remove namespace
        # Ensure the xmlns attribute is preserved
        if elem.tag == 'svg' and 'xmlns' not in elem.attrib:
            elem.set('xmlns', "http://www.w3.org/2000/svg")

def change_svg_dimensions_in_folder(folder_path, new_width="12", new_height="12"):
    # Walk through all subfolders and files in the root folder
    for root, _, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith(".svg"):
                file_path = os.path.join(root, filename)
                try:
                    # Parse the SVG file
                    tree = ET.parse(file_path)
                    root_element = tree.getroot()

                    # Remove namespace prefixes, but preserve xmlns attribute
                    remove_namespace(root_element)

                    # Check and update width and height attributes of the <svg> tag
                    if root_element.tag == 'svg':
                        root_element.set('width', new_width)
                        root_element.set('height', new_height)
                        # Save the updated SVG file
                        tree.write(file_path)
                        print(f"Updated {file_path}: width={new_width}, height={new_height}")
                    else:
                        print(f"No <svg> tag found in {file_path}")
                except ET.ParseError:
                    print(f"Failed to parse {file_path}. Skipping this file.")
                except Exception as e:
                    print(f"An error occurred with {file_path}: {e}")

# Usage example
# Use the current working directory as the root folder
root_folder = os.getcwd()
print(f"Processing SVG files in folder and subfolders: {root_folder}")
change_svg_dimensions_in_folder(root_folder)