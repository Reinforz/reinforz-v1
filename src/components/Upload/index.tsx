import { Typography } from "@material-ui/core";
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { useContext } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { SettingsContext } from "../../context/SettingsContext";
import sounds from "../../sounds";
import "./style.scss";

export interface UploadProps {
  onLoad: (result: string, file: File, notistack: { enqueueSnackbar: ((message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey), notistackOptionsObject: OptionsObject }) => any
  postRead: (files: any[]) => void
  className?: string
  uploadMessage?: string,
  accept?: string[],
  maxFiles?: number
}

const notistackOptionsObject = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject

export default function Upload(props: UploadProps) {
  const { settings } = useContext(SettingsContext);
  const { enqueueSnackbar } = useSnackbar();
  const { uploadMessage, className, onLoad, postRead, maxFiles } = props;

  const onDrop = (acceptedFiles: any) => {
    const filePromises: Promise<any>[] = [];
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      filePromises.push(new Promise((resolve, reject) => {
        reader.onabort = () => reject('file reading was aborted');
        reader.onerror = () => reject('file reading has failed');
        reader.onload = () => {
          const { result } = reader;
          if (result) {
            try {
              const data = onLoad(result as string, file, { enqueueSnackbar, notistackOptionsObject });
              if (data !== null && data !== undefined)
                resolve(data);
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
      postRead(files);
    });
  };

  const useDropZoneOptions: DropzoneOptions = { onDrop, accept: props.accept ?? [".yml", ".yaml", "application/json"] };

  if (maxFiles) useDropZoneOptions.maxFiles = maxFiles

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

  return <Typography component="div" variant="h6" style={{ borderColor }} className={`Upload bold bg-light ${className ?? ''}`} {...rootProps as any}>
    <input {...getInputProps()} />
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>{uploadMessage ?? `Drag 'n' drop some files here, or click to upload files (.json or .yaml files)`}</p>
    }
  </Typography>
}