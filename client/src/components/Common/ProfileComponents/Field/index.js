import React from "react";
import Input from "./Input";
import Select from "./Select";
import DatePicker from "./DatePicker";
import File from "./File";
import YesNoRadio from "./YesNoRadio";
import Checkist from "./Checkist";
import DateRanges from "./DateRanges";

import {
  Label,
  RequiredSpan,
  GrayHint,
  FieldWrapper,
} from "../ProfileComponents.style";

export default function Field({
  type,
  label: _label,
  placeholder,
  value: _value,
  handleChange,
  handleError,
  error: _error,
  name,
  options,
  fullHeight,
  parent,
  hint,
  userId,
  isPrivate,
  padding,
  paddingSmall,
  fieldPadding,
  requiredForIntern,
  requiredForHost,
  role,
  internLabel,
  hostLabel,
  // date Range
  disabledStartDate,
  disabledEndDate,
  onEndChange,
  onStartChange,
  handleAddMoreRanges,
  deleteDate,
  availableDates,
  readOnly,
}) {
  let url;

  const value = parent ? _value && _value[name] : _value;
  const error = parent ? _error && _error[name] : _error;

  if (type === "file") {
    url = _value && _value.url;
  }

  const isRequired =
    (role === "intern" && requiredForIntern) ||
    (role === "host" && requiredForHost);

  let label = _label;
  if (role === "intern") {
    label = internLabel || _label;
  }
  if (role === "host") {
    label = hostLabel || _label;
  }

  return (
    <FieldWrapper padding={fieldPadding}>
      <Label
        htmlFor={
          parent ? `${parent}${name[0].toUpperCase()}${name.slice(1)}` : name
        }
        padding={padding}
        paddingSmall={paddingSmall}
        error={error}
      >
        {label}
        {isRequired && <RequiredSpan>*</RequiredSpan>}
      </Label>
      {hint && <GrayHint>{hint}</GrayHint>}

      {type === "text" && (
        <Input
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          fullHeight={fullHeight}
          readOnly={readOnly}
        />
      )}

      {type === "textArea" && (
        <Input
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          showAsTextArea
          fullHeight={fullHeight}
          readOnly={readOnly}
        />
      )}

      {type === "select" && (
        <Select
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          options={options}
          readOnly={readOnly}
        />
      )}

      {type === "date" && (
        <DatePicker
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          readOnly={readOnly}
        />
      )}

      {type === "file" && (
        <File
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
          userId={userId}
          isPrivate={isPrivate}
          url={url}
          readOnly={readOnly}
        />
      )}

      {type === "yesNo" && (
        <YesNoRadio
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
          readOnly={readOnly}
        />
      )}

      {type === "dateRanges" && (
        <DateRanges
          disabledStartDate={disabledStartDate}
          disabledEndDate={disabledEndDate}
          onEndChange={onEndChange}
          onStartChange={onStartChange}
          handleAddMoreRanges={handleAddMoreRanges}
          deleteDate={deleteDate}
          availableDates={availableDates}
          error={error}
          readOnly={readOnly}
        />
      )}

      {type === "checklist" && (
        <Checkist
          value={value}
          handleChange={handleChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
          options={options}
          readOnly={readOnly}
        />
      )}
    </FieldWrapper>
  );
}
