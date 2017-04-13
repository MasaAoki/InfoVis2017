// Constructor
Vec3 = function(x,y,z)
{
  this.x = x;
  this.y = y;
  this.z = z;
}

//Add method
Vec3.prototype.add = function(v)
{
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
  return this;
}

// Sum method
Vec3.prototype.sum = function()
{
  return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function()
{
  if(this.x < this.y)
  {
    if(this.x < this.z) {
      return this.x;
    }
    else {
      return this.z;
    }
  }
  else if(this.y < this.z)
  {
    return this.y;
  }
  else
  {
    return this.z;
  }
}

// Mid method
Vec3.prototype.mid = function()
{
  if(this.x > this.y)
  {
    if(this.x < this.z) {
      return this.x;
    }
    else if(this.y > this.z){
      return this.y;
    }
    else {
      return this.z;
    }
  }
  else if(this.y < this.z)
  {
    return this.y;
  }
  else if(this.x < this.z)
  {
    return this.z;
  } else {
    return this.x;
  }
}

// Max method
Vec3.prototype.max = function()
{
  if(this.x > this.y)
  {
    if(this.x > this.z) {
      return this.x;
    }
    else {
      return this.z;
    }
  }
  else if(this.y > this.z)
  {
    return this.y;
  }
  else
  {
    return this.z;
  }
}

// Area Of Triangle Method
function AreaOfTriangle(v0, v1, v2)
{
  var v10x, v10y, v10z, v20x, v20y, v20z;
  var ip;
  v10x = v1.x - v0.x;
  v10y = v1.y - v0.y;
  v10z = v1.z - v0.z;
  v20x = v2.x - v0.x;
  v20y = v2.y - v0.y;
  v20z = v2.z - v0.z;
  ip = v10x*v20x + v10y*v20y + v10z*v20z;
  return Math.sqrt((v10x*v10x + v10y*v10y + v10z*v10z)*(v20x*v20x + v20y*v20y + v20z*v20z) - ip*ip)*0.5;
}
