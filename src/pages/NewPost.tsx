import React, { FormEvent, useState } from 'react';

import { uploadFile } from '../components/api/firebase';

import { TextField, Autocomplete, Button } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { Review } from '../components/classes/ReviewClass';
import { insertReview } from '../components/api/insertReview';

const groupsValues = [
  {
    label: 'Games',
  },
  {
    label: 'Movies',
  },
  {
    label: 'Series',
  },
];
const tagsValues = [
  {
    label: 'Shooter',
  },
  {
    label: 'Action',
  },
  {
    label: 'Rpg',
  },
];

const fileTypes = ['JPG', 'PNG', 'JPEG'];

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [group, setGroup] = useState({ label: '' });
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [imgPath, setImgPath] = useState(null);

  const handleChange = async (file: any) => {
    console.log(file, 'file');
    // setImgPath(await uploadFile(file));
  };

  const handleInput = (value: string | Array<Object>, callback: Function) => {
    callback(value);
  };

  return (
    <div className="review__new">
      <div className="review__new_left">
        <img src={imgPath} alt="" className="review__new_img" />
        <div className="review__new_input-file_block">
          <FileUploader
            handleChange={handleChange}
            name="file"
            multiple={false}
            types={fileTypes}
          />
        </div>
      </div>
      <div className="review__new_right">
        <div className="review__new_right_container">
          <TextField
            label="Title"
            id="outlined-size-small"
            size="small"
            style={{ gridColumn: '2 span' }}
            value={title}
            onInput={(e) => {
              handleInput((e.target as HTMLInputElement).value, setTitle);
            }}
          />
          <TextField
            label="Description"
            id="outlined-size-small"
            size="medium"
            multiline={true}
            style={{ gridColumn: '2 span' }}
            value={descr}
            onInput={(e) => {
              handleInput((e.target as HTMLInputElement).value, setDescr);
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            autoComplete={true}
            options={groupsValues}
            style={{ gridColumn: '1 span' }}
            size="small"
            renderInput={(params) => {
              return <TextField {...params} label="Group" />;
            }}
            onChange={(event, value) => {
              handleInput(value, setGroup);
            }}
          />
          <TextField
            label="Rating"
            id="outlined-size-small"
            size="small"
            type="number"
            style={{ gridColumn: '1 span' }}
            onInput={(e) => {
              handleInput(
                (e.target as HTMLInputElement).value.toString(),
                setRating
              );
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            autoComplete={true}
            multiple={true}
            options={tagsValues}
            style={{ gridColumn: '2 span' }}
            size="small"
            renderInput={(params) => {
              return <TextField {...params} label="Tags" />;
            }}
            onChange={(event, value) => {
              handleInput(value, setTags);
            }}
          />
          <Button
            variant="contained"
            size="large"
            style={{ gridColumn: '2 span' }}
            onClick={async () => {
              const newReview = new Review({
                title: title,
                descr: descr,
                imgPath: imgPath,
                group: group.label,
                tags: tags.map((item) => {
                  return item.label;
                }),
                rating: rating.toString(),
              })
              console.log(newReview);
              const response = await insertReview(newReview)
              console.log(response,'response');
              
            }}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
