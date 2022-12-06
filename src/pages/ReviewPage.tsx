import React from 'react';
import { useParams } from 'react-router-dom';

export default function ReviewPage() {
  const { id } = useParams();
  return <div>ReviewPage{id}</div>;
}
