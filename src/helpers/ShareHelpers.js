const url = process.env.REACT_APP_API_URL;

const handleFindRecipient = async (
  e,
  recepientName,
  sheetId,
  setErrors,
  setShowShareModal
) => {
  e.preventDefault();
  const response = await fetch(url + "api/v1/user/" + recepientName);

  if (!response.ok) {
    if (response.status === 404) {
      setErrors(["User not found"]);
      return;
    } else {
      setErrors([`Failed to fetch username: ${response.status}`]);
      return;
    }
  }

  const data = await response.json();
  const recipientId = await data.id;

  const userIds = await findUserIdsBySheetId(sheetId, setErrors);
  if (userIds.includes(recipientId)) {
    setErrors(["This user already has access to this character sheet."]);
    return;
  }

  setErrors([]);
  await handleShare(recipientId, sheetId, setErrors, setShowShareModal);
};

const findUserIdsBySheetId = async (sheetId, setErrors) => {
  const response = await fetch(url + "api/v1/userSheet/user/" + sheetId);

  if (!response.ok) {
    setErrors([`Failed to fetch user ids: ${response.status}`]);
  }

  const userIds = await response.json();
  return userIds;
};

const handleShare = async (recipientId, sheetId, setErrors, setShowShareModal) => {
  if (recipientId < 1) {
    setErrors(["The recipient has either not been selected or was not found."]);
    return;
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: recipientId,
      sheetId: sheetId,
      role: "EDITOR",
      status: "NONE",
    }),
  };

  fetch(url + "api/v1/userSheet", config)
    .then((response) => {
      if (response.ok) {
        setErrors([]);
        setShowShareModal(false);
      } else {
        return response.json();
      }
    })
    .then((errs) => {
      if (errs) {
        return Promise.reject(errs);
      }
    })
    .catch((errs) => {
      if (errs.length) {
        setErrors(errs);
      } else {
        setErrors([errs]);
      }
    });
};

export { handleFindRecipient };
