import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { useContext } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import "./style.scss";

interface Props {
  maxFiles?: number
  onLoad: (result: string, ext: string, notistack: { enqueueSnackbar: ((message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey), notistackOptionsObject: OptionsObject }, resolve: ((value: any) => void)) => void
  postRead: (files: any[]) => void
  className?: string
}

const notistackOptionsObject = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject

export default function Upload(props: Props) {
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext);
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = (acceptedFiles: any) => {
    const filePromises: Promise<any>[] = [];
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      filePromises.push(new Promise((resolve, reject) => {
        reader.onabort = () => reject('file reading was aborted');
        reader.onerror = () => reject('file reading has failed');
        reader.onload = () => {
          const dotSplitChunks = file.name.split(".");
          const ext = dotSplitChunks[dotSplitChunks.length - 1]
          const { result } = reader;
          if (result) {
            try {
              props.onLoad(result as string, ext, { enqueueSnackbar, notistackOptionsObject }, resolve);
            } catch (err: any) {
              enqueueSnackbar(`${file.name} Error: ${err.message}`, notistackOptionsObject)
            }
          } else
            enqueueSnackbar(`${file.name} is empty`, notistackOptionsObject);
        }
      }));
      reader.readAsText(file);
    });

    Promise.all(filePromises).then(files => {
      props.postRead(files);
    });
  };

  const useDropZoneOptions: DropzoneOptions = { onDrop, accept: [".yml", ".yaml", "application/json"] };

  if (props.maxFiles) useDropZoneOptions.maxFiles = props.maxFiles

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone(useDropZoneOptions)
  let borderColor = '#404040';
  if (isDragAccept)
    borderColor = '#00e676';
  if (isDragReject)
    borderColor = '#ff1744';
  if (isDragActive)
    borderColor = '#2196f3';

  const rootProps = getRootProps()

  const onClick = rootProps.onClick
  rootProps.onClick = (e) => {
    settings.sound && sounds.swoosh.play();
    onClick && onClick(e)
  }

  return <div style={{ borderColor, backgroundColor: theme.color.light, color: theme.palette.text.secondary }} className={`Upload ${props.className ?? ''}`} {...rootProps}>
    <input {...getInputProps()} />
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to upload files (.json or .yaml files)</p>
    }
  </div>
}