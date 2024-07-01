<form onSubmit={submit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={updateForm}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>


G04M3$ux3d