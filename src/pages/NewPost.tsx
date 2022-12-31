import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { uploadFile } from '../components/api/firebase';

import { TextField, Autocomplete, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FileUploader } from 'react-drag-drop-files';
import { Review } from '../components/classes/ReviewClass';
import { insertReview } from '../components/api/insertReview';
import { globalContext } from '../components/contexts/globalContext';
import { getToday } from '../components/lib/TimeFuncs';
import { groupsValues, tagsValues } from '../components/lib/GroupsAndTags';
import { updateTags } from '../components/api/updateTags';

const fileTypes = ['JPG', 'PNG', 'JPEG'];

export default function NewPost() {
  const {
    userName,
    isAuth,
    handleSnackbarOpen,
  } = useContext(globalContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [group, setGroup] = useState({ label: '' });
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [imgPath, setImgPath] = useState(null);

  const handleChange = async (file: any) => {
    console.log(file, 'file');
    setImgPath(await uploadFile(file));
  };

  const handleClick = async () => {
    const newReview = new Review({
      title: title,
      descr: descr,
      imgPath: imgPath,
      group: group.label,
      tags: tags.map((item) => {
        return typeof item == 'object' ? item.label.toLowerCase() : item.toLowerCase();
      }),
      rating: rating.toString(),
      author: userName,
      views: 0,
      likes: [],
      dislikes: [],
      createDate: getToday(),
    });
    console.log(tags, 'tags');
    console.log(newReview);
    const response = await insertReview(newReview);
    console.log(response, 'response');
    const updateTagsResponse = await updateTags(newReview.tags);
    console.log(updateTagsResponse, 'updateTagsResponse');

    if (response.success && updateTagsResponse.success) {
      navigate(`/review/${response.reviewId}`);
    }
  };

  const handleInput = (value: string | Array<Object>, callback: Function) => {
    callback(value);
  };

  useEffect(() => {
    if (!isAuth) {
      handleSnackbarOpen(
        'error',
        'You have to sign in to create your own posts'
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuth ? (
    <div className="review__new">
      <h2 className="review__new_title">Create post</h2>
      <div className="review__new_container">
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
                let thisInput = e.target as HTMLInputElement;
                thisInput.value =
                  Number(thisInput.value) > 100 ? '100' : thisInput.value;
                handleInput(thisInput.value.toString(), setRating);
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
              freeSolo={true}
              renderInput={(params) => {
                return <TextField {...params} label="Tags" />;
              }}
              onChange={(event, value) => {
                handleInput(value, setTags);
              }}
            />
            <p className="review__new_input_note">
              *Press "Enter" to add the tag to the field*
            </p>
            <Button
              variant="contained"
              size="large"
              style={{ gridColumn: '2 span' }}
              onClick={async () => {
                if (title && descr && group && tags && rating && imgPath) {
                  handleClick();
                } else {
                  handleSnackbarOpen(
                    'error',
                    `Please, fill out the entire form`
                  );
                }
              }}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="auth_error_block">
      <div className="auth_error">
        <IconButton
          onClick={() => {
            navigate('/');
          }}
          style={{ padding: '7px' }}
        >
          <ArrowBackIcon />
        </IconButton>
        You have to sign in to create your own posts
      </div>
    </div>
  );
}
