import { Typography } from "@mui/material";
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import useSounds from "../../hooks/useSounds";
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
  const { enqueueSnackbar } = useSnackbar();
  const { uploadMessage, className, onLoad, postRead, maxFiles } = props;
  const { swoosh } = useSounds();

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

  const useDropZoneOptions: DropzoneOptions = { onDrop };
  
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
  const inputProps = getInputProps();
  inputProps.accept = (props.accept ?? [".yaml", ".yml", ".json"]).join(", ");
  inputProps.style = {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0
  }
  
  const onClick = rootProps.onClick;

  rootProps.onClick = (e) => {
    swoosh();
    onClick && onClick(e)
  }

  return <Typography component="div" variant="h6" style={{ borderColor }} className={`Upload relative bold bg-light ${className ?? ''}`} {...rootProps as any}>
    <input {...inputProps} />
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>{uploadMessage ?? `Drag 'n' drop some files here, or click to upload files (.json or .yaml files)`}</p>
    }
  </Typography>
}