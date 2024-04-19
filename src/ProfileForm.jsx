import { useContext } from "react";
import "../node_modules/xterm/css/xterm.css";

import "./form.css";
import ImageSelect from "./ImageSelect";
import ResourceSelect from "./ResourceSelect";
import { SpawnerFormContext } from "./state";

/**
 * Generates the *contents* of the form shown in the profile selection page
 *
 * A <form> tag and a submit button are already included by JupyterHub, and should not
 * be generated here.
 */
function Form() {
  // Currently, we only support a single profile, with many options.
  const {
    profile: selectedProfile,
    setProfile,
    profileList,
    errors,
  } = useContext(SpawnerFormContext);
  const canSubmit = Object.keys(errors).length === 0;

  return (
    <fieldset
      aria-label="Select profile"
      aria-description="First, select the profile; second, configure the options for the selected profile."
    >
      <input
        type="radio"
        className="hidden"
        name="profile"
        value={selectedProfile?.slug}
        checked
        readOnly
      />
      {profileList.map((profile) => {
        const { display_name, description, profile_options, slug } = profile;
        const { image, resources } = profile_options;

        const isActive = !!selectedProfile && selectedProfile.slug === slug;

        return (
          <div key={slug} className="profile-select">
            <div className="profile-select-radio">
              <input
                type="radio"
                name="select-profile"
                id={`profile-option-${slug}`}
                value={slug}
                onChange={() => setProfile(slug)}
              />
              <label htmlFor={`profile-option-${slug}`}>
                {display_name} ({description})
              </label>
            </div>
            <div className="form-grid">
              <ImageSelect config={image} isActive={isActive} />
              <ResourceSelect config={resources} isActive={isActive} />
            </div>
          </div>
        );
      })}
      <button
        className="btn btn-jupyter form-control"
        type="submit"
        disabled={!canSubmit}
      >
        Start
      </button>
    </fieldset>
  );
}

export default Form;
